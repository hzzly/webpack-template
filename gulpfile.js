const gulp = require('gulp');

const $ = require('gulp-load-plugins')({
  rename: {
    'gulp.spritesmith': 'sprite',
    'gulp-tinypng-nokey': 'tiny',
  },
});

const spriteTemplateFunc = (data) => {
  const imageName = data.spritesheet.image.match(/[^/\\]+$/)[0].replace(/\.\w+$/, '');
  const file = data.sprites[0].image.split('/');
  const filename = file[file.length - 1];
  const shared = `
    %${imageName} {
      background-image: url(~@/images/${filename}?${new Date().getTime()});
      background-repeat: no-repeat;
    }
  `;

  const perSprite = data.sprites
    .map((sprite) => {
      const pX = sprite.offset_x ? `${sprite.offset_x}px` : 0;
      const pY = sprite.offset_y ? `${sprite.offset_y}px` : 0;

      return '@mixin N { width: W; height: H; background-position: X Y; }'
        .replace('N', sprite.name)
        .replace('W', `${sprite.width}px`)
        .replace('H', `${sprite.height}px`)
        .replace('X', pX)
        .replace('Y', pY);
    })
    .join('\n');

  return `${shared}\n${perSprite}`;
};

gulp.task('sprite', () =>
  gulp
    .src('src/assets/sprite/*.png')

    .pipe(
      $.sprite({
        padding: 8,
        imgName: 'images/sprite.png',
        cssName: 'scss/sprite.scss',
        algorithm: 'binary-tree',
        cssFormat: 'scss',
        cssTemplate: spriteTemplateFunc,
      })
    )
    .pipe(gulp.dest('src/'))
);

gulp.task('tinypng', () =>
  gulp.src('src/images/*.png').pipe($.tiny()).pipe(gulp.dest('src/images'))
);

gulp.task('sprite:tiny', gulp.series('sprite', 'tinypng'));
