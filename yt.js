var minimist = require('minimist');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');

var args = minimist(process.argv.slice(2), {
    default: {
        format: 'mp4'
    }
});

if (args._.length !== 2) {
    return console.log(
        '\nurl and output arguments are required\n\n'
        + 'usage: node yt <url> <output> [options]\n'
        + 'example: node yt https://www.youtube.com/watch?v=FCfAzkAsGX0 videos/test.avi -s 10 -d 5 -f avi\n\n'
        + 'url\turl to the video\n'
        + 'output\tfile to save the video as\n\n'
        + 'options:\n'
        + '   -s, --start REGEXP\ttimestamp for start of video, in seconds or [[hh:]mm:]ss[.xxx] format\n'
        + '   -d, --duration REGEXP\tlength to clip, in seconds or [[hh:]mm:]ss[.xxx] format\n'
        + '   -f, --format REGEXP\tformat to save video as (default mp4)'
    );
}

var writer = ffmpeg(ytdl(args._[0])).format(args.f || args.format);
if (args.s || args.start) {
    writer.seekInput(args.s || args.start);
}
if (args.d || args.duration) {
    writer.duration(args.d || args.duration);
}

writer.output(args._[1]).run();
