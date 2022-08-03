import renderPost from "../renders/Rpost.js"

export default (state) =>{
    const exampleModal = document.getElementById('modal')
    exampleModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget    
    const index = button.getAttribute('data-id');    
    const modalTitle = exampleModal.querySelector('.modal-title')
    const modalBody = exampleModal.querySelector('.modal-body')
    const modalFooter = exampleModal.querySelector('.modal-footer a');
    modalTitle.textContent = state.posts[index].title;
    modalBody.textContent = state.posts[index].description;
    modalFooter.setAttribute("href",state.posts[index].link);
    state.posts[index].viewed = true;
    renderPost(state.posts);
  })
}