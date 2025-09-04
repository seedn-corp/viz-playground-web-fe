type BreadcrumbItemProps = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItemProps[];
  pageTitle?: string;
};
