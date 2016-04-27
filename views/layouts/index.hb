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
        <div id="songs">
            {{{body}}}
        </div>
    </div>
</template>

<template id="playASongTemplate">
    <div class="theMusicVideo">
       <h2></h2>
        <iframe src="" allowfullscreen></iframe>
    </div>
</template>

<script src="../../js/jukebox.js"></script>
</body>
</html>