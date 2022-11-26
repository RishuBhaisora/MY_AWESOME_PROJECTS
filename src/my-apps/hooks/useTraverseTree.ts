const useTraverseTree: any = () => {
  function insertNode(
    tree: any,
    folderId: number,
    item: any,
    isFolder: boolean
  ) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
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
  return { insertNode, deleteNode };
};

export default useTraverseTree;
