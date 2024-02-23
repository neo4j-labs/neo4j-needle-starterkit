import { useState } from 'react';
import { SideNavigation } from '@neo4j-ndl/react';
import { MagnifyingGlassIconOutline, DbmsIcon, BellAlertIconOutline } from '@neo4j-ndl/react/icons';

export default function SideNav() {
  const [expanded, setOnExpanded] = useState<boolean>(!(window.innerWidth < 450));
  const [selected, setSelected] = useState('instances');
  const [isMobile] = useState<boolean>(window.innerWidth < 450);

  const handleClick = (item: string) => (e: any) => {
    e.preventDefault();
    setSelected(item);
  };
  const fullSizeClasses = 'n-w-full n-h-full';
  const expandedChangeProp = isMobile ? {} : { onExpandedChange: setOnExpanded };

  return (
    <div className='h-[calc(100vh-58px)] min-h-[700px] flex'>
      <SideNavigation iconMenu={true} expanded={expanded} {...expandedChangeProp}>
        <SideNavigation.List>
          <SideNavigation.Item
            href='#'
            selected={selected === 'search'}
            onClick={handleClick('search')}
            {...(isMobile ? { icon: <MagnifyingGlassIconOutline className={fullSizeClasses} /> } : {})}
            icon={<MagnifyingGlassIconOutline className={fullSizeClasses} />}
          >
            Search
          </SideNavigation.Item>
          <SideNavigation.Item
            href='#'
            selected={selected === 'instances'}
            onClick={handleClick('instances')}
            icon={<DbmsIcon className={fullSizeClasses} />}
          >
            Instances
          </SideNavigation.Item>
          <SideNavigation.GroupHeader>Example</SideNavigation.GroupHeader>
          <SideNavigation.Item
            href='#'
            selected={selected === 'notifications'}
            onClick={handleClick('notifications')}
            icon={<BellAlertIconOutline className={fullSizeClasses} />}
          >
            Notifications
          </SideNavigation.Item>
        </SideNavigation.List>
      </SideNavigation>
    </div>
  );
}
