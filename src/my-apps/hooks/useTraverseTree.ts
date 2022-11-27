const useTraverseTree: any = () => {
  function insertNode(
    tree: any,
    folderId: number,
    item: any,
    isFolder: boolean
  ) {
    if (tree.id === folderId && tree.isFolder) {
      const newItems = [...tree.items];
      newItems.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });

      return { ...tree, items: newItems };
    }

    const latestNode = tree.items.map((itm: any) => {
      return insertNode(itm, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  }
  function deleteNode(tree: any, idToDelete: number) {
    if (tree.id === idToDelete) {
      return { id: new Date().getTime(), items: [] };
    }
    const latestNode = tree.items.map((itm: any) => {
      return deleteNode(itm, idToDelete);
    });
    return { ...tree, items: latestNode };
  }
  function editNode(tree: any, idToEdit: number, item: string) {
    if (idToEdit === tree.id) {
      return { ...tree, name: item };
    }
    const latestNode = tree.items.map((itm: any) => {
      return editNode(itm, idToEdit, item);
    });
    return { ...tree, items: latestNode };
  }
  return { insertNode, deleteNode, editNode };
};

export default useTraverseTree;
