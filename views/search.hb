<h1><a href="/logout" >Logout</a> Jukeboxes <a href="/" >Main page</a></h1>
<br>
<br>
<br>
<form action="" method="post">
        <select name="search">
        <option value="0">* Your own jukebox *</option>
        {{#each jukebox}}
            <option value="{{this.[id]}}">{{this.[title]}}</option>
        {{/each}}
        </select>
        <br>
        <br>
        <input type="submit" value="Show jukebox">
</form>
<script src='https://www.google.com/recaptcha/api.js'></script>