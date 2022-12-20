import React, { useState } from 'react';

import markdown from './README.mdx';
import {
  Sidebar,
  SidebarHeader,
  SidebarBackButton,
  SidebarScroll,
} from './Sidebar';
import DATA from './PHONEBOOK.json';
import User from '../User';
import { List, ListItem } from '../List';
import { MainNavigation } from '../MainNavigation';
import Item from '../Item';
import Empty from '../Empty';
import Search from '../Search';
import Tag from '../Tag';

export default {
  title: 'Components/Content Related/Sidebar',
  component: Sidebar,
  subcomponents: { SidebarHeader, SidebarBackButton, SidebarScroll },
  parameters: {
    status: 'released',
    mdx: markdown,
    previewWidth: 'full',
  },
};

export const Regular = (args) => {
  const [active, setActive] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <MainNavigation pageWidth="full" />
      <Sidebar
        {...args}
        active={active}
        sidebar={
          <>
            <SidebarHeader>
              <Search />
            </SidebarHeader>
            <Item
              additional="Yesterday"
              hint={<Tag kind="wfp">Hint</Tag>}
              kind="horizontal"
              subContent="subcontent"
              title="A title is shown"
              wrapper="sidebar"
              onClick={() => setActive(true)}
            />
          </>
        }
        sidebarMobileHeader={
          <>
            <SidebarBackButton onClick={() => setActive(false)}>
              Back
            </SidebarBackButton>
            <div>Detail page</div>
          </>
        }>
        {active ? (
          <Item
            additional="Yesterday"
            hint={<Tag kind="wfp">Hint</Tag>}
            kind="large"
            showAdditionalIcon
            subContent="This is the subContent. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. "
            title="A title is shown"
            wrapper="button">
            nonumy eirmod tempor invidunt
          </Item>
        ) : (
          <Empty title="Content here">
            When an item is selected, its corresponding content will be shown
            here
          </Empty>
        )}
      </Sidebar>
    </div>
  );
};

const codesnippet = `
import { Sidebar , SidebarHeader, SidebarBackButton, Tag,
  MainNavigation, Item, Search, Empty} from "@un/react";


const Phonebook = () => {
 const [active, setActive] = useState(false);

 return (
   <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
     <MainNavigation pageWidth="full" />
     <Sidebar
       active={active}
       sidebar={
         <>
           <SidebarHeader>
             <Search id="search22" />
           </SidebarHeader>
           <Item
             additional="Yesterday"
             hint={<Tag kind="wfp">Hint</Tag>}
             kind="horizontal"
             subContent="subcontent"
             title="A title is shown"
             wrapper="sidebar"
             onClick={() => setActive(true)}
           />
         </>
       }
       sidebarMobileHeader={
         <>
           <SidebarBackButton onClick={() => setActive(false)}>
             Back
           </SidebarBackButton>
           <div>Detail page</div>
         </>
       }>
       {active ? (
         <Item
           additional="Yesterday"
           hint={<Tag kind="wfp">Hint</Tag>}
           kind="large"
           showAdditionalIcon
           subContent="This is the subContent. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. "
           title="A title is shown"
           wrapper="button">
           nonumy eirmod tempor invidunt
         </Item>
       ) : (
         <Empty title="Content here">
           When an item is selected, its corresponding content will be shown
           here
         </Empty>
       )}
     </Sidebar>
   </div>
 );
}

export default Phonebook;
`;

Regular.story = {
  parameters: {
    docs: {
      source: {
        code: codesnippet,
      },
    },
  },
};

export const Phonebook = () => {
  const [selectedUserId, setSelectedUserId] = useState();
  const [search, setSearch] = useState();
  const selectedUserData = DATA.find((e) => e.id === selectedUserId);

  const searchResults = search
    ? DATA.filter((e) =>
        e.full_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : DATA;
  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <MainNavigation pageWidth="full" />
      <Sidebar
        active={selectedUserId}
        sidebarMobileHeader={
          <>
            <SidebarBackButton onClick={() => setSelectedUserId()}>
              Back
            </SidebarBackButton>
            <div>Detail page</div>
          </>
        }
        sidebar={
          <>
            <SidebarHeader>
              <Search onChange={(e) => setSearch(e)} />
            </SidebarHeader>
            <SidebarScroll>
              {searchResults && searchResults.length > 0 ? (
                searchResults.map((user, key) => (
                  <Item
                    active={selectedUserId === user.id}
                    key={key}
                    image={
                      user.profile_image ? (
                        <img alt={user.full_name} src={user.profile_image} />
                      ) : undefined
                    }
                    title={user.full_name}
                    children={user.email}
                    subContent={user.phone_number}
                    kind="horizontal"
                    wrapper="sidebar"
                    onClick={() => setSelectedUserId(user.id)}
                    noImage
                  />
                ))
              ) : (
                <Empty title="No results">Please check your search</Empty>
              )}
            </SidebarScroll>
          </>
        }>
        {selectedUserData ? (
          <div
            style={{
              backgroundColor: '#fff',
              padding: '1rem',
            }}>
            <User
              id={selectedUserData.staff_id}
              alt="avatar"
              description={
                <List small>
                  <ListItem>{selectedUserData.job_title}</ListItem>
                </List>
              }
              image={selectedUserData.profile_image}
              name={selectedUserData.full_name}
              style={{
                borderBottom: '1px solid #edf1f3',
                padding: '1rem 0 2rem 0',
                marginBottom: '1rem',
              }}
            />
            <div>
              <div
                style={{
                  borderBottom: '1px solid #edf1f3',
                  padding: '1rem 0',
                }}>
                <h4>Bio</h4>
                <List small>
                  <ListItem>{selectedUserData.bio}</ListItem>
                </List>
              </div>

              <div
                style={{
                  borderBottom: '1px solid #edf1f3',
                  padding: '1rem 0',
                }}>
                <h4>Contact</h4>
                <List small>
                  <ListItem>email: {selectedUserData.email}</ListItem>
                  <ListItem>phone: {selectedUserData.phone_number}</ListItem>
                </List>
              </div>

              <div style={{ padding: '1rem 0' }}>
                <h4>Location</h4>
                <List small>
                  <ListItem>country: {selectedUserData.country}</ListItem>
                </List>
              </div>
            </div>
          </div>
        ) : (
          <Empty title="No user selected">Please select a user</Empty>
        )}
      </Sidebar>
    </div>
  );
};

const sourcecode = `
import React, {useState} from 'react';
import { Sidebar , SidebarHeader, SidebarBackButton, SidebarScroll,
     MainNavigation, User, Item, Search, Empty, List, ListItem } from "@un/react";

const phonebookdata = [
  {
    "id": 1,
    "full_name": "Ivan Wansbury",
    "email": "iwansbury0@aol.com",
    "phone_number": "587-361-8780",
    "country": "Russia",
    "job_title": "Tax Accountant",
    "staff_id": "30-0410793",
    "bio": "dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum",
    "profile_image": "https://robohash.org/quirepellendussit.bmp?size=50x50&set=set1"
  },
  {
    "id": 2,
    "full_name": "Kerwin McElhargy",
    "email": "kmcelhargy1@wsj.com",
    "phone_number": "601-930-2145",
    "country": "United States",
    "job_title": "Accounting Assistant II",
    "staff_id": "93-7190318",
    "bio": "augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget"
  },
]

const Phonebook = () => {
        
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [search, setSearch] = useState();
  const selectedUserData = phonebookdata.find((e) => e.id === selectedUserId);

  const searchResults = search
    ? phonebookdata.filter((e) =>
        e.full_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : phonebookdata;
    
  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <MainNavigation pageWidth="full" />
      <Sidebar
        active={selectedUserId}
        sidebarMobileHeader={
            <>
            <SidebarBackButton onClick={() => setSelectedUserId()}>
              Back
            </SidebarBackButton>
            <div>Detail page</div>
          </>
        }
        sidebar={
          <>
            <SidebarHeader>
              <Search id="search11" onChange={(e) => setSearch(e)} />
            </SidebarHeader>
            <SidebarScroll>
              {searchResults && searchResults.length > 0 ? (
                searchResults.map((user, key) => (
                  <Item
                    active={selectedUserId === user.id}
                    key={key}
                    image={
                      user.profile_image ? (
                        <img alt={user.full_name} src={user.profile_image} />
                      ) : undefined
                    }
                    title={user.full_name}
                    subContent={user.phone_number}
                    kind="horizontal"
                    wrapper="sidebar"
                    onClick={() => setSelectedUserId(user.id)}
                    noImage
                  >{user.email}</Item>
                ))
              ) : (
                <Empty title="No results">Please check your search</Empty>
              )}
            </SidebarScroll>
          </>
        }>
        {selectedUserData ? (
          <div
            style={{
              backgroundColor: '#fff',
              padding: '1rem',
            }}>
            <User
              id={selectedUserData.staff_id}
              alt="avatar"
              description={
                <List small>
                  <ListItem>{selectedUserData.job_title}</ListItem>
                </List>
              }
              image={selectedUserData.profile_image}
              name={selectedUserData.full_name}
              style={{
                borderBottom: '1px solid #edf1f3',
                padding: '1rem 0 2rem 0',
                marginBottom: '1rem',
              }}
            />
            <div>
              <div
                style={{
                  borderBottom: '1px solid #edf1f3',
                  padding: '1rem 0',
                }}>
                <h4>Bio</h4>
                <List small>
                  <ListItem>{selectedUserData.bio}</ListItem>
                </List>
              </div>

              <div
                style={{
                  borderBottom: '1px solid #edf1f3',
                  padding: '1rem 0',
                }}>
                <h4>Contact</h4>
                <List small>
                  <ListItem>email: {selectedUserData.email}</ListItem>
                  <ListItem>phone: {selectedUserData.phone_number}</ListItem>
                </List>
              </div>

              <div style={{ padding: '1rem 0' }}>
                <h4>Location</h4>
                <List small>
                  <ListItem>country: {selectedUserData.country}</ListItem>
                </List>
              </div>
            </div>
          </div>
        ) : (
          <Empty title="No user selected">Please select a user</Empty>
        )}
      </Sidebar>
    </div>
  );
  }

  export default Phonebook;
`;

Phonebook.story = {
  parameters: {
    docs: {
      source: {
        code: sourcecode,
      },
    },
  },
};
