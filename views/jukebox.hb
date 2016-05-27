{{#if isLoggedIn}}
    <h1>{{title}} <a href="/new" >Create a new jukebox</a> <a href="/search" >Search for a jukebox</a></h1>
    <template id="jukeboxTemplate">
        <div id="theJukebox">
            <div id="playASong">
            </div>
                <div id="songs">
                    {{#each data}}
                            <button value="{{this.[1]}}" type="submit">{{this.[0]}}</button>
                    {{/each}}
                    <br>
                </div>
        </div>
    </template>
    <script src="../../js/jukebox.js"></script>
{{/if}}