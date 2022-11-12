const router = require("express").Router();
const { Storage } = require("@google-cloud/storage");
const { body, validationResult } = require("express-validator");

const bucketCredentials = import.meta.env.VITE_BUCKET_JSON_CREDENTIALS;
const storage = new Storage({ keyFilename: bucketCredentials });
const buckets = {
    private: import.meta.env.VITE_PRIVATE_BUCKET,
    public: import.meta.env.VITE_PUBLIC_BUCKET,
};
// Checks for any character that is not a:
// "word" character, "-", "/", " ", ".".
const invalidFilePathRegex = /[^\w-/. ]/i;

const handleGetSignedUrlError = (next) => (error) => {
    console.error("[get-signed-url] [error]", error);
    return next({
        code: 500,
        message: error.message || error,
    });
};

router.post(
    "/",
    [
        body("action").toLowerCase().isIn(["read", "write", "delete"]),
        body("bucketType").toLowerCase().isIn(Object.keys(buckets)),
    ],
    // eslint-disable-next-line consistent-return
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const [firstError] = errors.array();
            return next({
                code: 400,
                message: `Error: "${firstError.msg}" in param: "${firstError.param}"`,
            });
        }
        const { action, bucketType, filePath } = req.body;

        const bucket = storage.bucket(buckets[bucketType]);
        const getSignedUrlConfig = {
            version: "v4",
            action,
            expires: Date.now() + 1000 * 15, // 15 minutes from now
        };
        const isArray = Array.isArray(filePath);

        console.log("[get-signed-url]");
        console.log(`bucket: ${buckets[bucketType]}\nfilePath: ${filePath}`);

        if (isArray) {
            if (filePath.some((item) => invalidFilePathRegex.test(item))) {
                return next({
                    code: 400,
                    message: "filePath contains invalid characters",
                });
            }
            Promise.all(
                filePath.map((item) =>
                    bucket.file(item).getSignedUrl(getSignedUrlConfig)
                )
            )
                .then((values) =>
                    res.json(
                        values.flat().map((signedURL, i) => ({
                            signedURL,
                            URI: `${buckets[bucketType]}/${filePath[i]}`,
                        }))
                    )
                )
                .catch(handleGetSignedUrlError(next));
        } else if (invalidFilePathRegex.test(filePath)) {
            return next({
                code: 400,
                message: "filePath contains invalid characters",
            });
        } else {
            bucket
                .file(filePath)
                .getSignedUrl(getSignedUrlConfig)
                .then(([signedURL]) =>
                    res.json({
                        signedURL,
                        URI: `${buckets[bucketType]}/${filePath}`,
                    })
                )
                .catch(handleGetSignedUrlError(next));
        }
    }
);

module.exports = router;
