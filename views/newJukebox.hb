 <h1><a href="/logout" >Logout</a> Create/update jukebox <a href="/" >Main page</a></h1>
 <br>
 <br>
    <form action="" method="post">
        <br>
        <h2>* Create a jukebox of YouTube links, if you already created a jukebox it overwrites the old one *</h2>
        <br>
        <h2>Title of the jukebox:</h2>
        <input type="text" name="title" placeholder="Give your jukebox a title" required>
        <br>
        <h2>Enter Youtube links one per row.</h2>
        <textarea rows="50" cols="50" name="links" placeholder="https://www.youtube.com/watch?v=w-nIFDfdfaU https://m.youtube.com/watch?v=w-nIFDfdfaU..." required></textarea>
        <br>
        <br>
        <input type="submit" value="Create a new jukebox">
        <br>
     </form>
<script src="../../js/jukebox.js"></script>