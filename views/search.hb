<h1><a href="/logout" >Logout</a> Look for other jukeboxes</h1>
<br>
<br>
<br>
<form action="" method="post">
        <select name="search">
        {{#each jukebox}}
            <option value="{{this.[id]}}">{{this.[title]}}</option>
        {{/each}}
        </select>
        <br>
        <br>
        <input type="submit" value="Search">
</form>
<script src='https://www.google.com/recaptcha/api.js'></script>