#! /usr/bin/env node

var minimist = require('minimist');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');

var args = minimist(process.argv.slice(2));
var options = {};
if (args.a) {
    options.filter = 'audioonly';
}
if (!args.f && !args.format) {
    args.f = args.a ? 'mp3' : 'mp4';
}

if (args._.length !== 2) {
    return console.log(
        '\nurl and output arguments are required\n\n'
        + 'usage: node yt <url> <output> [options]\n'
        + 'example: node yt https://www.youtube.com/watch?v=FCfAzkAsGX0 videos/test.avi -s 10 -d 5 -f avi\n\n'
        + 'url\turl to the video\n'
        + 'output\tfile to save the video as\n\n'
        + 'options:\n'
        + '   -a\t\t\t\tflag to get the audio instead of video\n'
        + '   -s, --start REGEXP\t\ttimestamp for start of video, in seconds or [[hh:]mm:]ss[.xxx] format\n'
        + '   -d, --duration REGEXP\tlength to clip, in seconds or [[hh:]mm:]ss[.xxx] format\n'
        + '   -f, --format REGEXP\t\tformat to save video as (default mp4)'
    );
}

var writer = ffmpeg(ytdl(args._[0]), options).format(args.f || args.format);
if (args.a) {
    writer.audioBitrate(128);
}
if (args.s || args.start) {
    writer.seekInput(args.s || args.start);
}
if (args.d || args.duration) {
    writer.duration(args.d || args.duration);
}

writer.output(args._[1]).run();
