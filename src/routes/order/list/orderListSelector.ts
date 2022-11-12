import type { AppState } from "redux/configureStore";

export const selectOrderListData = ({ user, order }: AppState) => ({
    isDataLoading: order.isDataLoading,
    isLoading: order.isLoading,
    data: order.data,
    query: order.query,
    checkedItems: order.checkedItems,
});

export type PropsFromSelector = ReturnType<typeof selectOrderListData>;
