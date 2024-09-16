import { Suspense } from "react"

import { getCustomer, listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { Avatar } from "@medusajs/ui"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)
  const customer = await getCustomer().catch(() => null)

  const getCustomerName= () => {
    if (customer?.first_name && customer?.last_name) {
      return `${customer.first_name[0]}${customer.last_name[0]}`;
    }
    return "S";
  };

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <div className="bg-blue-700 w-full h-full">
          <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular text-white">
            <div className="flex-1 basis-0 h-full flex items-center ">
              <div className="h-full">
                <SideMenu regions={regions} />
              </div>
            </div>

            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:underline uppercase"
                data-testid="nav-store-link"
              >
                Snow-Mart
              </LocalizedClientLink>
            </div>

            <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <div className="hidden small:flex items-center gap-x-6 h-full">
                {process.env.FEATURE_SEARCH_ENABLED && (
                  <LocalizedClientLink
                    className="hover:underline"
                    href="/search"
                    scroll={false}
                    data-testid="nav-search-link"
                  >
                    Search
                  </LocalizedClientLink>
                )}
                <LocalizedClientLink
                  className="hover:underline flex items-center gap-2"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  <Avatar src="" fallback={getCustomerName()} /> Account
                </LocalizedClientLink>
              </div>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:underline flex gap-2"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}
