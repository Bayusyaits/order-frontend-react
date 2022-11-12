import React from 'react'
import Row from './row'
const OrderListView = () => (
  <>
    <div className="content">
      <h2 className="intro-y text-lg font-medium mt-10">
          Order
      </h2>
      <div className="intro-y box px-5 pt-5 mt-5 w-full">
        <div className="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5">
        <div className="px-5 tns-item" id="new-products-item4" aria-hidden="true">
          <div className="flex flex-col lg:flex-row items-center pb-5">
              <div className="flex flex-col sm:flex-row items-center pr-5 lg:border-r border-gray-200 dark:border-dark-5">
                  <div className="mr-auto text-center sm:text-left mt-3 sm:mt-0">
                      <a href="" className="font-medium text-lg">Data Customer</a>
                  </div>
              </div>
              <div className="w-full lg:w-auto mt-6 lg:mt-0 pt-4 lg:pt-0 flex-1 flex items-center justify-center px-5 border-t lg:border-t-0 border-gray-200 dark:border-dark-5">
                  <div className="text-center rounded-md w-20 py-3">
                      <div className="font-medium text-theme-17 dark:text-theme-3 text-xl">91</div>
                      <div className="text-gray-600">Orders</div>
                  </div>
                  <div className="text-center rounded-md w-20 py-3">
                      <div className="font-medium text-theme-17 dark:text-theme-3 text-xl">20k</div>
                      <div className="text-gray-600">Purchases</div>
                  </div>
                  <div className="text-center rounded-md w-20 py-3">
                      <div className="font-medium text-theme-17 dark:text-theme-3 text-xl">91</div>
                      <div className="text-gray-600">Reviews</div>
                  </div>
              </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center border-t border-gray-200 dark:border-dark-5 pt-5">
              <div className="w-full sm:w-auto flex justify-center sm:justify-start items-center border-b sm:border-b-0 border-gray-200 dark:border-dark-5 pb-5 sm:pb-0">
                  <div className="px-3 py-2 bg-theme-31 dark:bg-dark-5 dark:text-gray-300 text-theme-26 rounded font-medium mr-3">29 October 2021</div>
              </div>
              <div className="flex sm:ml-auto mt-5 sm:mt-0">
                  <button className="btn btn-secondary w-20 ml-auto">History</button>
                  <button className="btn btn-primary w-20 ml-2">Save</button>
              </div>
          </div>
      </div>
        </div>
      </div>
      <Row/>
    </div>
  </>
)

export default OrderListView
