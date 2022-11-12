import React from "react";

import RowView from "./RowView";
import type { ViewProps } from "./RowView";

const RowContainer = (props: Props) => {
    return (
        <RowView/>
    );
};

export default React.memo(RowContainer);
