function createObjectComment() {
    fetch("./data.json")
    .then(res => res.json())
    .then(data => {
        let currentUser = data.currentUser
        let obj = {
            "id": 1,
            "content": document.getElementById("text-write").value,
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
        if (document.getElementById("text-write").value.trim().length) {
            document.getElementById("text-write").value = ""
            let divComments = document.getElementById("comments");
            divComments.appendChild(createComment(obj, currentUser))
            return
        }
        document.getElementById("text-write").value = ""
        return
    })
}