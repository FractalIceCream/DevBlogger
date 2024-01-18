const newCommentFormHandler = async (event) => {
    event.preventDefault();
    const inputEl = event.target.parentElement.children[1];
    const commentText = inputEl.value;
    const blogId = inputEl.getAttribute('data-blogId');
    if (blogId && commentText) {
        // Send a POST request to the API endpoint
        console.log('comment on blog');
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({
                text: commentText,
                blog_id: blogId
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

const submitBtn = document.querySelectorAll('.submit-comment');
submitBtn.forEach(btn => btn.addEventListener('click', newCommentFormHandler));