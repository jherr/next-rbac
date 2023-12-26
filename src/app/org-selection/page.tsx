import { OrganizationList } from "@clerk/nextjs";

export default function OrganizationListPage() {
  return (
    <div className="flex h-screen justify-center items-center align-middle">
      <OrganizationList afterSelectOrganizationUrl="/" hidePersonal />
    </div>
  );
}
