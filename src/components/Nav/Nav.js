import styled from "styled-components";
import { StyledButton } from "../Button/StyledButton.js";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";

const NavBar = styled.nav`
  background-color: #86b6f6;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const items = [
  {
    label: <StyledButton onClick={() => signOut()}>Sign Out</StyledButton>,
    key: "0",
  },
];

export default function Nav() {
  const { data: session } = useSession();

  return (
    <NavBar>
      {session ? (
        <>
          <span>Welcome, {session.user.name}</span>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <Space direction="vertical" size={16}>
              <Space wrap size={16}>
                <Avatar size="large" icon={<UserOutlined />} />
              </Space>
            </Space>
          </Dropdown>
        </>
      ) : (
        <>
          <StyledButton onClick={() => signIn("github")}>Sign Up</StyledButton>
          <StyledButton onClick={() => signIn("github")}>Sign In</StyledButton>
        </>
      )}
    </NavBar>
  );
}
