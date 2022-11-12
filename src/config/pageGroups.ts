type Page = { name: string; path: string }
export type PageGroup =
  | {
      name: string
      icon: null
      path: string
      pages: Page[]
    }
  | {
      name: string
      icon: null
      path: string
      subgroups: {
        name: string
        pages: Page[]
      }[]
    }

export const pageGroups: PageGroup[] = [
  {
    name: 'Inventory',
    icon: null,
    path: '/inventory',
    subgroups: [
      {
        name: 'Bin',
        pages: [
          { name: 'Bin', path: '/bin' },
          { name: 'Bin Type', path: '/bin-type' },
        ],
      },
      {
        name: 'Inventory View',
        pages: [
          { name: 'Inventory View By SKU', path: '/inventory-view-by-sku' },
          { name: 'Inventory View By SKU Bin Lot', path: '/inventory-view-by-sku-bin-lot' },
        ],
      },
      {
        name: 'Conversion',
        pages: [
          { name: 'Conversion', path: '/conversion' },
          { name: 'Conversion Rule', path: '/conversion-rule' },
        ],
      },
      {
        name: 'Others',
        pages: [
          { name: 'Movement', path: '/inventory-movement' },
          { name: 'Adjustment', path: '/adjustment' },
          { name: 'Cycle Count', path: '/cycle-count' },
          { name: 'Incident Report', path: '/incident-report' },
        ],
      },
    ],
  },
  {
    name: 'Master Data',
    icon: null,
    path: '/master-data',
    subgroups: [
      {
        name: 'Location',
        pages: [
          { name: 'Warehouse Master', path: '/warehouse-master' },
          { name: 'Zone Master', path: '/zone-master' },
          { name: 'Row Master', path: '/row-master' },
          { name: 'Locator Master', path: '/locator-master' },
          { name: 'Shipping Zone Master', path: '/shipping-zone-master' },
        ],
      },
      {
        name: 'SKU',
        pages: [
          { name: 'Division Master', path: '/division-master' },
          { name: 'Department Master', path: '/department-master' },
          { name: 'Category Master', path: '/category-master' },
          { name: 'Subcategory Master', path: '/subcategory-master' },
          { name: 'SKU Master', path: '/sku-master' },
          { name: 'Keyword Master', path: '/keyword-master' },
          { name: 'Brand Master', path: '/brand-master' },
          // { name: 'UoM Master', path: '/unit-master' },
          // { name: 'Grade Master', path: '/grade-master' },
          // { name: 'Tax Category Master', path: '/tax-category-master' },
        ],
      },
    ],
  },
  {
    name: 'Add On',
    icon: null,
    path: '/add-on',
    subgroups: [
      {
        name: 'Inventory Planning',
        pages: [
          { name: 'Inventory Planning', path: '/inventory-planning' },
          { name: 'Working Document', path: '/working-document' },
          { name: 'Conversion Task', path: '/conversion-task' },
        ],
      },
      {
        name: 'Consolidation',
        pages: [
          { name: 'Consolidation Monitoring', path: '/consolidation-monitoring' },
          { name: 'Manifest', path: '/manifest' },
        ],
      },
      {
        name: 'Inbound',
        pages: [{ name: 'Putaway Monitoring', path: '/putaway-monitoring' }],
      },
      {
        name: 'Stock Counting',
        pages: [
          { name: 'Stock Counting', path: '/stock-counting' },
          { name: 'SKU Master', path: '/stock-counting-sku' },
          { name: 'Bin Master', path: '/stock-counting-bin-master' },
        ],
      },
      {
        name: 'Others',
        pages: [{ name: 'SKU Relation', path: '/sku-relation' }],
      },
    ],
  },
  {
    name: 'Inbound',
    icon: null,
    path: '/inbound',
    pages: [
      { name: 'Purchase Order', path: '/purchase-order' },
      { name: 'Inbound Document', path: '/inbound-document' },
      { name: 'Quality Control', path: '/quality-control' },
      { name: 'Good Receipt', path: '/dashboard' },
      { name: 'Putaway', path: '/putaway' },
    ],
  },
  {
    name: 'Outbound',
    icon: null,
    path: '/outbound',
    subgroups: [
      {
        name: 'Outbound',
        pages: [
          { name: 'Sales Order', path: '/sales-order' },
          { name: 'Outbound Monitoring', path: '/outbound-monitoring' },
          { name: 'Return To Vendor', path: '/return-to-vendor' },
          { name: 'Transfer Order', path: '/transfer-order' },
          { name: 'Manifest', path: '/outbound-manifest' },
          { name: 'Packing', path: '/packing' },
        ],
      },
      {
        name: 'Pick List',
        pages: [
          { name: 'Pick List Management', path: '/pick-list-management' },
          { name: 'Pick List by Order', path: '/picklist-by-order' },
          { name: 'Wave Setup', path: '/wave' },
        ],
      },
    ],
  },
  {
    name: 'Settings',
    icon: null,
    path: '/settings',
    subgroups: [
      {
        name: 'User Management',
        pages: [
          { name: 'User Roles', path: '/user-roles' },
          { name: 'Endpoint Roles', path: '/endpoint-roles' },
          { name: 'User Warehouses', path: '/user-warehouses' },
        ],
      },
      {
        name: 'Feature Flags',
        pages: [{ name: 'Add-on', path: '/add-on-feature-flags' }],
      },
    ],
  },
]
