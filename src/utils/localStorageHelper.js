export function saveEditsToLocalStorage(id, field, value) {
  const storedEdits = JSON.parse(localStorage.getItem('commentEdits') || '{}');
  const updatedEdits = {
    ...storedEdits,
    [id]: {
      ...storedEdits[id],
      [field]: value
    }
  };
  localStorage.setItem('commentEdits', JSON.stringify(updatedEdits));
}