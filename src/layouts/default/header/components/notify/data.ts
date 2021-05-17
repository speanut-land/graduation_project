export interface ListItem {
  id: string;
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra?: string;
  color?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  unreadlist?: ListItem[];
}

export const tabListData: TabItem[] = [
  {
    key: "1",
    name: "通知",
    list: [
      {
        id: "000000001",
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
        title: "你收到了 14 份新周报",
        description: "",
        datetime: "2017-08-09",
        type: "1",
      },
      {
        id: "000000002",
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
        title: "你推荐的 曲妮妮 已通过第三轮面试",
        description: "",
        datetime: "2017-08-08",
        type: "1",
      },
      {
        id: "000000003",
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
        title: "这种模板可以区分多种通知类型",
        description: "",
        datetime: "2017-08-07",
        // read: true,
        type: "1",
      },
      {
        id: "000000004",
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title: "左侧图标用于区分不同的类型",
        description: "",
        datetime: "2017-08-07",
        type: "1",
      },
    ],
  },
];
