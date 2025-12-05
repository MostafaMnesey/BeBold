import "next-intl";

type Messages = typeof import("../Lang/en.json");

declare module "next-intl" {
  interface IntlMessages extends Messages {}
}
