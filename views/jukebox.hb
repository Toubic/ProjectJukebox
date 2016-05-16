 {{#if isLoggedIn}}
    <template id="jukeboxTemplate">
        <div id="theJukebox">
            <div id="playASong">
            </div>
                <div id="songs">
                    {{#each data}}
                        <input type="button" value={{this}}>
                    {{/each}}
                    <br>
                    <a href="/new" >Create a new jukebox</a>
                </div>
        </div>
    </template>
{{/if}}
<script src="../../js/jukebox.js"></script>