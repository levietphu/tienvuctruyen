import React from "react";
import ViewDashboard from "./dashboard/view/ViewDashboard";
import ViewCate from "./cate/views/ViewCate";
import ViewAuthor from "./author/views/ViewAuthor";
import ViewTranslator from "./translator/views/ViewTranslator";
import ViewAds from "./ads/views/ViewAds";
import ViewContact from "./contact/views/ViewContact";
import ViewLogo from "./logo/views/ViewLogo";
import ViewTransaction from "./transaction/view/ViewTransaction";
import WithdrawMoneyView from "./withdrawmoney/view/WithdrawMoneyView";
import ViewAffiliatedBank from "./affiliatedbank/view/ViewAffiliatedBank";
import ViewBanner from "./banner/views/ViewBanner";
import ViewBankInfo from "./bankinfo/views/ViewBankInfo";
import ViewStory from "./story/views/ViewStory";
import ViewUser from "./user/views/ViewUser";
import ViewRole from "./role/views/ViewRole";
import CreateStory from "./story/views/CreateStory";
import EditStory from "./story/views/EditStory";
import ViewChapter from "./chapter/views/ViewChapter";
import ViewLoadCent from "./loadcents/views/ViewLoadCent";
import ViewDiscount from "./discount/views/ViewDiscount";
import ViewPermission from "./permission/views/ViewPermission";

const routesCms: any[] = [
  { path: "/", index: true, per: "", component: <ViewDashboard /> },
  {
    path: "/cate/view",
    index: true,
    per: "cate-view",
    component: <ViewCate />,
  },
  {
    path: "/author/view",
    index: true,
    per: "author-view",
    component: <ViewAuthor />,
  },
  {
    path: "/trans/view",
    index: true,
    per: "trans-view",
    component: <ViewTranslator />,
  },
  { path: "/ads/view", index: true, per: "ads-view", component: <ViewAds /> },
  {
    path: "/contact/view",
    index: true,
    per: "contact-view",
    component: <ViewContact />,
  },
  {
    path: "/logo/view",
    index: true,
    per: "logo-view",
    component: <ViewLogo />,
  },
  {
    path: "/transaction/view",
    index: true,
    per: "transaction-view",
    component: <ViewTransaction />,
  },
  {
    path: "/withdraw_money/view",
    index: true,
    per: "withdrawmoney-view",
    component: <WithdrawMoneyView />,
  },
  {
    path: "/affiliated_bank/view",
    index: true,
    per: "affiliatedbank-view",
    component: <ViewAffiliatedBank />,
  },
  {
    path: "/banner/view",
    index: true,
    per: "banner-view",
    component: <ViewBanner />,
  },
  {
    path: "/bankinfo/view",
    index: true,
    per: "bankinfo-view",
    component: <ViewBankInfo />,
  },
  {
    path: "/story/view",
    index: true,
    per: "story-view",
    component: <ViewStory />,
  },
  {
    path: "/user/view",
    index: true,
    per: "user-view",
    component: <ViewUser />,
  },
  {
    path: "/role/view",
    index: true,
    per: "role-view",
    component: <ViewRole />,
  },
  {
    path: "/per/view",
    index: true,
    per: "per-view",
    component: <ViewPermission />,
  },
  {
    path: "/story/create",
    index: true,
    per: "story-create",
    component: <CreateStory />,
  },
  {
    path: "/story/edit/:id_story",
    index: true,
    per: "story-edit",
    component: <EditStory />,
  },
  {
    path: "/discount/:id_story/view",
    index: true,
    per: "",
    component: <ViewDiscount />,
  },
  {
    path: "/chapter/:id_story/view",
    index: true,
    per: "",
    component: <ViewChapter />,
  },
  {
    path: "/loadcent/:id_bankinfo/view",
    index: true,
    per: "",
    component: <ViewLoadCent />,
  },
];

export default routesCms;
