# ytdl-custom
tool to clip a section of a youtube video

```
$ node yt

url and output arguments are required

usage: node yt <url> <output> [options]
example: node yt https://www.youtube.com/watch?v=FCfAzkAsGX0 videos/test.avi -s 10 -d 5 -f avi

url     url to the video
output  file to save the video as

options:
   -s, --start REGEXP           timestamp for start of video, in seconds or [[hh:]mm:]ss[.xxx] format
   -d, --duration REGEXP        length to clip, in seconds or [[hh:]mm:]ss[.xxx] format
   -f, --format REGEXP          format to save video as (default mp4)
```

probably shitty and buggy
