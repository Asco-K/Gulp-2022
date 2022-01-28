import dartsass from 'sass';
import gulpsass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import concatCss from 'gulp-concat-css';

const sass = gulpsass(dartsass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(sass({
            outputStyle: 'expanded',
        }))
        .pipe(app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            webpcss({
                webClass: '.webp',
                noWebpClass: '.no-webp'
            })
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            autoprefixer({
                grid: true,
                overrideBrowserlist: ['last 3 versions'],
                cascade: true,
            })
        ))
        // .pipe(app.gulp.dest(app.path.build.scss))
        .pipe(app.plugins.if(
            app.isBuild,
            cleanCss()
        ))
        .pipe(rename({
            extname: '.min.css',
        }))
        // .pipe(concatCss(app.path.src.css))
        .pipe(app.gulp.dest(app.path.build.scss))
        .pipe(app.plugins.browsersync.stream())
}