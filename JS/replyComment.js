function replyComment(divCommentsReplies) {
    fetch("./data.json")
    .then(res => res.json())
    .then(data => {
        let currentUser = data.currentUser
        let obj = {
            "id": Date.now,
            "content": "",
            "createdAt": "just now",
            "score": "0",
            "user": {
                "image": { 
                    "png": currentUser.image.png,
                    "webp": currentUser.image.webp
                },
                "username": currentUser.username
            },
            "replies": []
        }
        let comentario = createComment(obj, currentUser);
        divCommentsReplies.appendChild(comentario);

        let what = document.querySelector(`#${comentario.id} .edit`);
        what.click()
      
    })
}