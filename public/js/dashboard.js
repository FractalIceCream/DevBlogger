const newBlogFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#blog-description').value.trim();
  if (title && description) {
    // Send a POST request to the API endpoint
      console.log('blog new post');
      const response = await fetch('/api/blog/', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
  }
};
const updateBlogFormHandler = async (event) => {
  event.preventDefault();
  const postEl = event.target.parentElement.parentElement;
console.log(postEl);
  const title = postEl.children[0].children[0].querySelector('.post-title').value.trim();
console.log(title);
  const description = postEl.querySelector('.post-description').value.trim();
  
  if (title && description) {
    console.log('updated blog post');
    const response = await fetch('/api/blog', {
      method: 'UPDATE',
      body: JSON.stringify({title, description}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }

  }
}

const deleteBlogFormHandler = async (event) => {
  event.preventDefault();
  
}

const submitBtn = document.querySelector('#submit-blog');
const updateBtn = document.querySelectorAll('.update-blog');
const deleteBtn = document.querySelectorAll('.delete-blog');
submitBtn.addEventListener('click', newBlogFormHandler);
updateBtn.forEach((btn) => btn.addEventListener('click', updateBlogFormHandler));
deleteBtn.forEach((btn) => btn.addEventListener('click', deleteBlogFormHandler));