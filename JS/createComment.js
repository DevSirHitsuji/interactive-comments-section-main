function createComment(comment, currentUser) {
    let thisId = comment.user.username + "-" + Date.now();
    let commentAndReplies = CE("div", "comment-replies")
    commentAndReplies.style = `order: ${comment.score * -1}`
    commentAndReplies.id = thisId + "-replies";

    let Comment = CE("div", "comment");
    Comment.id = thisId;
    Comment.style = `order: ${comment.score * -1}`

    let likesReply = CE("div", "mobile-likes-reply");


    let Likes = CE("div", "likes");

    let btnMore = CE("button", "btn-more");
    let btnMoreIcon = CE("img", "btn-more-icon")
    btnMoreIcon.src = "./images/icon-plus.svg";
    btnMore.appendChild(btnMoreIcon)

    btnMore.addEventListener("click", () => {
        let likeNum = document.querySelector(`#${thisId} #like`)
        likeNum.innerHTML = parseInt(likeNum.innerHTML) + 1
        document.getElementById(thisId).style = `order: ${likeNum.innerHTML * -1}`
        document.getElementById(thisId+"-replies").style = `order: ${likeNum.innerHTML * -1}`
    })
    let btnLess = CE("button", "btn-less");
    let btnLessIcon = CE("img", "btn-more-less");
    btnLessIcon.src = "./images/icon-minus.svg";
    btnLess.appendChild(btnLessIcon)

    btnLess.addEventListener("click", () => {
        let likeNum = document.querySelector(`#${thisId} #like`)
        likeNum.innerHTML = parseInt(likeNum.innerHTML) - 1
        document.getElementById(thisId).style = `order: ${likeNum.innerHTML * -1}`
        document.getElementById(thisId+"-replies").style = `order: ${likeNum.innerHTML * -1}`
    })

    let likeNum = CE("p", "like", "id", comment.score);

    [btnMore, likeNum, btnLess].map((ele) => {Likes.appendChild(ele)});


    let userInfos = CE("div", "user-infos");
    let user = CE("div", "user");

    let userImg = CE("img", "photo");
    userImg.src = comment.user.image.png;
    let username = CE("p", "username", "class", comment.user.username);
    let indicator = CE("p", "indicator", "class", "you")
    currentUser.username == comment.user.username ? indicator.style = "diplay: block" : indicator.style = "display: none"
    let time = CE("div", "time", "class", comment.createdAt);
    [userImg, username, indicator, time].map((ele) => {user.appendChild(ele)});


    let custom = CE("div", "custom c-mobile");

    let Delete = CE("button", "delete");
    Delete.style = "display: flex"

    Delete.addEventListener("click", () => {
        let result = confirm("Delete this comment?")

        if (result) {
            document.querySelector(`#${thisId}`).remove();
        }
        
    })
    
    let DelIcon =  CE("img", "delImg")
    DelIcon.src = "./images/icon-delete.svg";
    let DelText = CE("p", "DelText", "class", "Delete");
    [DelIcon, DelText].map((ele) => {Delete.appendChild(ele)});


    let Edit = CE("button", "edit");
    Edit.style = "display: flex"

    Edit.addEventListener("click", () => {
        let box = document.querySelector(`#${thisId} .content`);
        let editBtn = document.querySelector(`#${thisId} .edit`);
        let saveBtn = document.querySelector(`#${thisId} .save`);

        editBtn.style = "display: none"
        saveBtn.style = "display: flex"
        
        let text = document.querySelector(`#${thisId} .content-text`).innerHTML;
        document.querySelector(`#${thisId} .content-text`).remove();
        let textArea = CE("textarea", "text-edit", "class", text);
        textArea.placeholder = "Write your comment here..."
        textArea.setAttribute("autofocus" , "enable")
        box.appendChild(textArea);

    })

    let EditIcon =  CE("img", "EditImg");
    EditIcon.src = "./images/icon-edit.svg";
    let EditText = CE("p", "EditText", "class", "Edit");
    [EditIcon, EditText].map((ele) => {Edit.appendChild(ele)});


    let Save = CE("button", "save");
    Save.style = "display: none";

    
    Save.addEventListener("click", () => {
        let box = document.querySelector(`#${thisId} .content`);
        let editBtn = document.querySelector(`#${thisId} .edit`);
        let saveBtn = document.querySelector(`#${thisId} .save`);

        let text = document.querySelector(`#${thisId} .text-edit`).value;

        if (text.trim().length) {
            editBtn.style = "display: flex"
            saveBtn.style = "display: none"
            document.querySelector(`#${thisId} .text-edit`).remove();
            document.querySelector(`#${thisId} .error`).style = "display: none"
            let textP = CE("p", "content-text", "class", text)
            box.appendChild(textP);
        } else {
            document.querySelector(`#${thisId} .text-edit`).value = "";
            document.querySelector(`#${thisId} .error`).style = "display: block"
        }


    })

    let saveText = CE("p", "save-text", "class", "Save")
    Save.appendChild(saveText);


    [Delete, Edit, Save].map((ele) => {custom.appendChild(ele)})



    let reply = CE("div", "reply r-desktop");

    reply.addEventListener("click", () => {
        replyComment(document.querySelector(`#${thisId}-replies .replies`))
    })

    let replyIcon = CE("img", "reply-icon");
    replyIcon.src = "./images/icon-reply.svg"
    let replyText = CE("p", "reply-text", "class", "Reply");

    [replyIcon, replyText].map((ele) => {reply.appendChild(ele)});

    if (comment.user.username == currentUser.username) {
        [user].map((ele) => {userInfos.appendChild(ele)});
    } else {
        [user, reply].map((ele) => {userInfos.appendChild(ele)});
    }
    

    
    
    if (comment.user.username == currentUser.username) {
        [Likes, custom].map((ele) => {likesReply.appendChild(ele)})

    } else {

        let replyMoba = CE("div", "reply r-mobile");
        replyMoba.addEventListener("click", () => {
            replyComment(document.querySelector(`#${thisId}-replies .replies`))
        })

        let replyMobaIcon = CE("img", "reply-icon");
        replyMobaIcon.src = "./images/icon-reply.svg"
        let replyMobaText = CE("p", "reply-text", "class", "Reply");
    
        [replyMobaIcon, replyMobaText].map((ele) => {replyMoba.appendChild(ele)});
        [Likes, replyMoba].map((ele) => {likesReply.appendChild(ele)})
    }

    let div = CE("div", "none")
    let content = CE("div", "content")
    let contentText = CE("p", "content-text", "class", comment.content);
    content.appendChild(contentText);
    let alertError = CE("p", "error", "class", "You don't write nothing!");
    alertError.style = "display: none;"
    content.appendChild(alertError);
    
    [userInfos, content].map((ele) => {div.appendChild(ele)});
    [likesReply, div].map((ele) => {Comment.appendChild(ele)});
    commentAndReplies.appendChild(Comment);

    let divReplies = CE("div", "replies");
    divReplies.style = `order: ${comment.score * -1}`;
    comment.replies?.map((ele) => {divReplies.appendChild(createComment(ele, currentUser))});
    
    commentAndReplies.appendChild(divReplies);

    return commentAndReplies;
}