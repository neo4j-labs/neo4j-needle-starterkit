import { Tabs } from '@neo4j-ndl/react';

export default function Nav({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (e: string) => void }) {
  return (
    <>
      <Tabs size='large' fill='underline' onChange={(e) => setActiveTab(e)} value={activeTab}>
        <Tabs.Tab tabId={'Templates'}>Template</Tabs.Tab>
        <Tabs.Tab tabId={'Components'}>Component</Tabs.Tab>
      </Tabs>
    </>
  );
}
