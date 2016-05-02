<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Project Jukebox</title>
    <link rel="stylesheet" href="../../css/style.css" />
</head>
<body>
<template id="jukeboxTemplate">
    <div id="theJukebox">
        <h1>The Jukebox</h1>
        <div id="playASong">
        </div>
        <div id="songs">
            {{{body}}}
        </div>
    </div>
</template>
<script src="../../js/jukebox.js"></script>
</body>
</html>