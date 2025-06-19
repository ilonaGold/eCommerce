import { createElement } from "../../utils/dom/createElement";
import { getState } from "../../state/state";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";
import { mainBanner } from "../../components/home/mainBanner/mainBanner";
import { discounts } from "../../components/home/discounts/discounts";
import { promoCode } from "../../components/home/promoCode/promoCode";
import { newArrivals } from "../../components/home/newArrivals/newArrivals";
import { mainComponent } from "../../components/main/main";

import "./renderHome.css";

export async function renderHome(parent: HTMLElement): Promise<void> {
  const isAuth = getState("userAuth");
  const customer = getState("customer");
  const header = createHeader(isAuth, customer);
  const sectionWithBanner = mainBanner();
  const sectionWithDiscounts = await discounts();
  const sectionWithPromoCode = await promoCode();
  const sectionWithNewArrivals = await newArrivals();
  const sections = createElement("div", { class: "home-page__all-sections" }, [
    sectionWithBanner,
    sectionWithDiscounts,
    sectionWithPromoCode,
    sectionWithNewArrivals,
  ]);

  const main = mainComponent(sections);
  const footer = createFooter();
  const viewContainer = createElement("div", { class: "view-container" }, [header, main, footer]);
  parent.append(viewContainer);
}
