//Listen for form submit
document.getElementById('bmForm').addEventListener('submit', saveBookmark);
//Save Bookmark
function saveBookmark(e){
    //Get form values
    var siteName=document.getElementById('siteName').value;
    var siteUrl=document.getElementById('siteUrl').value;

    if(!validateForm(siteName,siteUrl)){
        return false;
    }

    var bookmark={
        name:siteName,
        url:siteUrl
    }
/*     //Local Storage Test
    localStorage.setItem('test','Hello LS');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
 */
    //Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        //Init Array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else{
        //Get bookmarks from LocalStorage
        var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to Array
        bookmarks.push(bookmark);
        //Re-set back to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

        document.getElementById('bmForm').reset();

        //Re-fetch bookmarks
        fetchBookmarks();
        //Prevent form from submit!
        e.preventDefault();
}

//Delete Bookmark
function deleteBookmark(url){
    //Get bookmarks from LocalStorage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    //Loop for already get bookmarks
    for(var i=0; i<bookmarks.length; i++){
        if(bookmarks[i].url==url){
            //Remove from array
            bookmarks.splice(i,1);
        }
    }
        //Re-set back to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        //Re-fetch bookmarks
        fetchBookmarks();
}

//Fetch Bookmarks
function fetchBookmarks(){
     //Get bookmarks from LocalStorage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    //Get output id
    var bmResults=document.getElementById('bmResults');

    //Build output
    bmResults.innerHTML='';
    for(var i=0; i<bookmarks.length; i++){
        var name=bookmarks[i].name;
        var url=bookmarks[i].url;

        bmResults.innerHTML+='<div class="well">'+
                             '<h3>'+name+
                             '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                             '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                             '</h3>'+
                             '</div>';
    }
}

//Validate Form
function validateForm(siteName,siteUrl){
     if(!siteName || !siteUrl){
        alert('Please fill in the form!');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL!');
        return false;
    }
    return true;
}