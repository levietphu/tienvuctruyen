import { Card, Button, Table, Alert, Checkbox, Modal, Tooltip } from "antd";
import "../styles/view-user.scss";
import type { ColumnsType } from "antd/es/table";
import { updateRole, getUser, blockUser, addCoin } from "../api";
import { useEffect, useState } from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { EditOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faUserSlash,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

interface DataType {
  id: number;
  name: string;
  email: string;
  status: number;
}

const ViewUser: React.FC = () => {
  const [dataUser, setDataUser] = useState<any>();
  const [dataRole, setDataRole] = useState<any>();
  const [alert, setAlert] = useState("");
  const [idRole, setIdRole] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render(value, record, index) {
        return <a>{index + 1}</a>;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_, record) => {
        return (
          <Button type="primary" size="small" danger={record.status !== 1}>
            {record.status === 1 ? "hoạt động" : "Bị chặn"}
          </Button>
        );
      },
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (value) => {
        return (
          <Checkbox.Group
            options={dataRole.map((item: any) => {
              return {
                label: item.name,
                value: item.id,
              };
            })}
            onChange={getIdRole}
            defaultValue={value.map((item: any) => item.id)}
          ></Checkbox.Group>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (value) => (
        <>
          <Tooltip title="Thêm xu" color={"blue"}>
            <Button
              type="primary"
              size="small"
              onClick={showModal}
              style={{ marginRight: "5px" }}
            >
              <FontAwesomeIcon icon={faCoins} />
            </Button>
          </Tooltip>
          <Tooltip title="Cập nhật vai trò" color={"blue"}>
            <Button
              type="primary"
              size="small"
              onClick={() =>
                updateRoleForUser(
                  value.id,
                  value.role.map((item: any) => item.id)
                )
              }
            >
              <EditOutlined rev={undefined} />
            </Button>
          </Tooltip>
          <Tooltip
            title={value.status === 0 ? "Bỏ chặn" : "Chặn"}
            color={value.status === 0 ? "blue" : "red"}
          >
            <Button
              type="primary"
              size="small"
              danger={value.status === 0}
              style={{ marginLeft: "5px" }}
              onClick={() => {
                if (
                  // eslint-disable-next-line no-restricted-globals
                  confirm(`Bạn có muốn block user ${value.name} này không`) ===
                  true
                ) {
                  hiddenUser(value.id);
                }
              }}
            >
              <FontAwesomeIcon
                icon={value.status === 1 ? faUserCheck : faUserSlash}
              />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getUser()
      .then((res: any) => {
        setDataUser(res.data.user);
        setDataRole(res.data.role);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (alert) {
      var a = setTimeout(() => {
        setAlert("");
      }, 3000);
    }
    return () => clearTimeout(a);
  }, [alert]);

  const getIdRole = (checkedValue: CheckboxValueType[]) => {
    setIdRole({ id_role: checkedValue });
  };

  const updateRoleForUser = (id_user: number, data: any) => {
    let dataIdRole: any = {};
    dataIdRole.id_role = data;
    updateRole(id_user, idRole ? idRole : dataIdRole)
      .then((res: any) => {
        setAlert(res.data.message);
        getUser()
          .then((res: any) => {
            setDataUser(res.data.user);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const hiddenUser = (id_user: number) => {
    blockUser(id_user)
      .then((res) => {
        setAlert(res.data.message);
        getUser()
          .then((res: any) => {
            setDataUser(res.data.user);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const addCoinUser = (id_user: number, data: any) => {
    addCoin(id_user, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="top-main">
        <p>Danh sách user</p>
        <div className="top-main__right">
          <a href="">user</a> / <span>Danh sách user</span>
        </div>
      </div>
      <Card>
        {alert && (
          <Alert
            message={alert}
            type="success"
            style={{ marginBottom: "20px", fontSize: "24px" }}
          />
        )}
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Table
          columns={columns}
          dataSource={dataUser}
          rowKey={(record) => record.id}
        />
      </Card>
    </>
  );
};

export default ViewUser;
