import SideNav from "./SideNav";
import Content from "../Content";

export default function PageLayout() {
  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <Content />
    </div>
  );
}
