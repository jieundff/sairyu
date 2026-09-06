import { useState } from "react";
import type { CartItem, NavItemId, Product, ScreenId } from "@/shop/types";
import { findProduct, PRODUCTS } from "@/shop/data/products";
import { AppHeader } from "@/shop/components/layout/AppHeader";
import { MobileShell } from "@/shop/components/layout/MobileShell";
import { SideDrawer } from "@/shop/components/nav/SideDrawer";
import { AboutScreen } from "@/shop/screens/AboutScreen";
import { ArchiveScreen } from "@/shop/screens/ArchiveScreen";
import { CartConfirmScreen } from "@/shop/screens/CartConfirmScreen";
import { CartScreen } from "@/shop/screens/CartScreen";
import { HomeScreen } from "@/shop/screens/HomeScreen";
import { LoginScreen } from "@/shop/screens/LoginScreen";
import { ProductDetailScreen } from "@/shop/screens/ProductDetailScreen";
import { ProductListScreen } from "@/shop/screens/ProductListScreen";

/**
 * ShopApp — composes the component layer into the ten screens of the Figma
 * page and moves between them.
 *
 * Navigation is a `useState` switch rather than a router: the design has no
 * URLs of its own, and this keeps the shop dependency-free. Cart state lives
 * here so Add to Cart, the confirmation screen and the cart list all read the
 * same lines.
 */
export function ShopApp() {
  const [screen, setScreen] = useState<ScreenId>("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [cart, setCart] = useState<readonly CartItem[]>([]);

  const product = findProduct(productId);
  const lastLine = cart[cart.length - 1];

  function go(next: ScreenId) {
    setScreen(next);
    setDrawerOpen(false);
  }

  function handleNavigate(id: NavItemId) {
    go(id === "archive" ? "archive" : "products");
  }

  function addToCart(item: Product, quantity: number) {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === item.id);
      if (existing) {
        return current.map((line) =>
          line.product.id === item.id
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );
      }
      return [...current, { product: item, quantity, selected: true }];
    });
  }

  function updateLine(id: string, patch: Partial<Omit<CartItem, "product">>) {
    setCart((current) =>
      current.map((line) =>
        line.product.id === id ? { ...line, ...patch } : line,
      ),
    );
  }

  const isArchive = screen === "archive";

  return (
    <div className="shop">
      <MobileShell overlayHeader={screen === "home"}>
        {!isArchive && (
          <AppHeader
            variant={screen === "home" ? "white" : "black"}
            onMenuClick={() => setDrawerOpen(true)}
            onCartClick={() => go("cart")}
          />
        )}

        <div className="shop-shell__body">
          {screen === "home" && (
            <HomeScreen
              onLink={(id) => go(id === "about" ? "about" : "archive")}
            />
          )}

          {screen === "about" && <AboutScreen />}

          {isArchive && <ArchiveScreen onClose={() => go("home")} />}

          {screen === "products" && (
            <ProductListScreen
              onSelectProduct={(id) => {
                setProductId(id);
                go("product-detail");
              }}
            />
          )}

          {screen === "product-detail" && (
            <ProductDetailScreen
              product={product}
              onAddToCart={(item, quantity) => {
                addToCart(item, quantity);
                go("cart-confirm");
              }}
              onBuyNow={(item, quantity) => {
                addToCart(item, quantity);
                go("cart");
              }}
            />
          )}

          {screen === "login" && (
            <LoginScreen
              onSubmit={() => go("home")}
              onLink={() => undefined}
              onSocial={() => undefined}
            />
          )}

          {screen === "cart-confirm" && lastLine && (
            <CartConfirmScreen
              item={lastLine}
              onQuantityChange={(quantity) =>
                updateLine(lastLine.product.id, { quantity })
              }
              onGoToCart={() => go("cart")}
              onPlaceOrder={() => go("cart")}
            />
          )}

          {screen === "cart" && (
            <CartScreen
              items={cart}
              onSelectChange={(id, selected) => updateLine(id, { selected })}
              onQuantityChange={(id, quantity) => updateLine(id, { quantity })}
              onRemove={(id) =>
                setCart((current) =>
                  current.filter((line) => line.product.id !== id),
                )
              }
              onOrderSelected={() => undefined}
              onOrderAll={() => undefined}
            />
          )}
        </div>
      </MobileShell>

      <SideDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={handleNavigate}
        onFooterLink={(id) => {
          if (id === "login") go("login");
        }}
      />
    </div>
  );
}

export default ShopApp;
