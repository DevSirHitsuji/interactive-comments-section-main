fetch("./data.json")
.then(res => res.json())
.then(data => {
    let comments = data.comments;
    let currentUser = data.currentUser;
    document.getElementById("send-comment-avatar").src = currentUser.image.png;
    comments.map((ele) => {
        let divComments = document.getElementById("comments");
        divComments.appendChild(createComment(ele, currentUser))
    })
})