interface ComponentList {
  title: string;
  description: string;
  components: [
    {
      component: string;
      codeExample: string;
    }
  ];
}

interface ComponentsMuiProps {
  dataList: ComponentList[];
}

export { ComponentList, ComponentsMuiProps };
export default ComponentList;
