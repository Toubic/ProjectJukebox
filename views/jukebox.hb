 {{#if isLoggedIn}}
    <h1>{{title}} <a href="/new" >Create a new jukebox</a></h1>
    <template id="jukeboxTemplate">
        <div id="theJukebox">
            <div id="playASong">
            </div>
                <div id="songs">
                    {{#each data}}
                        <input type="button" value={{this}}>
                    {{/each}}
                    <br>
                </div>
        </div>
    </template>
{{/if}}
<script src="../../js/jukebox.js"></script>