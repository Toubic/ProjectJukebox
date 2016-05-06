 {{#if isLoggedIn}}
    <template id="jukeboxTemplate">
        <div id="theJukebox">
            <h1>The Jukebox</h1>
                <div id="playASong">
                </div>
                        <div id="songs">
                            {{#each data}}
                                <input type="button" value={{this}}>
                            {{/each}}
                        </div>
        </div>
    </template>
{{/if}}
<script src="../../js/jukebox.js"></script>