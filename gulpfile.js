const gulp = require('gulp');

const $ = require('gulp-load-plugins')({
  rename: {
    'gulp.spritesmith': 'sprite',
    'gulp-tinypng-nokey': 'tiny',
  },
});

const spriteTemplateFunc = (data) => {
  const imageName = data.spritesheet.image.match(/[^\/\\]+$/)[0].replace(/\.\w+$/, '');
  const fn = '$base: 40; @function rem( $px ){@return $px/60*1rem;}';
  const file = data.sprites[0].image.split('/');
  const filename = file[file.length - 1];
  const shared = `
    %${imageName} {
      background-image: url(~@/images/${filename}?${new Date().getTime()});
      background-repeat: no-repeat;
      background-size: rem(${data.spritesheet.width}) rem(${data.spritesheet.height});
    }
  `;

  const perSprite = data.sprites
    .map((sprite) => {
      let pX = sprite.offset_x
        ? `${(sprite.offset_x / (sprite.width - sprite.total_width)) * 100}%`
        : 0;
      let pY = sprite.offset_y
        ? `${(sprite.offset_y / (sprite.height - sprite.total_height)) * 100}%`
        : 0;
      return '@mixin N { width: rem(W); height: rem(H); background-position: X Y; }'
        .replace('N', sprite.name)
        .replace('W', sprite.width)
        .replace('H', sprite.height)
        .replace('X', pX)
        .replace('Y', pY);
    })
    .join('\n');

  return `${fn}\n${shared}\n${perSprite}`;
};

gulp.task('sprite', () =>
  gulp
    .src('src/assets/images/*.png')

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
