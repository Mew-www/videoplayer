const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concatenate = require('gulp-concat');
const browsersync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const ESLINT_RULES = {
  // For reference including all possible rules, and (if any) their sub-options, see https://eslint.org/docs/rules/

  /*
   * (ALL SUPPORTED) RULES ON (POTENTIAL) ERRORS regarding code syntax / structure / flow
   */

  // (0) ALLOW THESE CASES
  'no-console': 0, // ALLOW using console.log(), these settings are for BOTH development AND "production" environment
  'no-constant-condition': 0, // ALLOW "if (true)" and similar
  'no-control-regex': 0, // If someone uses control chars like /\x1f/ inside regex, presume they have a reason
  'no-extra-boolean-cast': 0, // ALLOW unnecessary casting to boolean with "if (!!myVar)" (for purpose of strongly implying "this is represented as boolean")
  'no-prototype-builtins': 0, // ALLOW calling directly "myInstance.hasOwnProperty('some_prop')" instead of myInstance.prototype.hasOwnProperty('some_prop')
  'no-regex-spaces': 0, // ALLOW using repeated whitespace literals in regex instead of / {10}/ for example of ten whitespaces. Regex allows it.
                        // MOTIVATION: Regex does not automatically convert these for us, yet those as a string of "          " and " {10}" ARE different.
  'no-template-curly-in-string': 0, // ALLOW use of let notATemplateString = "something ${something}"; aswell as with '-quotes. It is not a syntax error.
  'no-unexpected-multiline': 0, // ALLOW multiline commands, it is not a syntax error and SOMETIMES preferable. Syntax errors will show up elsewhere.
  'valid-jsdoc': 0, // ALLOW using whatever other commenting scheme than JSDoc. We aren't using it yet at least.
                    // MAY CHANGE if we start using JSDoc.

  // (1) WARN BUT CONTINUE BUILD IN THESE CASES
  'no-await-in-loop': 1, // Warn but let (reasonless) looped await calls be
  'for-direction': 1, // Warn but if intended infinite-loop, let it be
  'no-empty': 1, // Warn but if intended "if(something) {  }" let it be; Do not require a comment
  'no-extra-parens': 1, // Warn but permit "let calc = 6 - (2*3);"
  'no-extra-semi': 1, // Warn but permit "doSomething();;"
  'no-func-assign': 1, // Warn but permit in case if need to shadow a function declaration "function asd() {}" from some library. Mostly because jQuery.
  'no-invalid-regexp': 1, // Warn but let the invalid regex run (in case if it would be intended)
  'no-irregular-whitespace': 1, // Warn but permit non-tab non-whitespace "other space characters" in code. For comment / regex / whatever use.
  'no-sparse-arrays': 1, // Warn but allow user of empty array slots like [a,b,,,c] which translate to [a,b,undefined,undefined,c]
  'no-unreachable': 1, // Warn but allow. Even though "return x; console.log(y);" is technically a syntax error, the code works. Inform but build.
  'no-unsafe-finally': 1, // Warn but allow control flow changes inside "finally { return somethingElse; }" -block.
                          // MOTIVATION: 0 or 2 would be more reasonable, but I can't decide so make it inform yet continue the build. Each to their own.
  'no-unsafe-negation': 1, // Warn but allow using for example "let a = truthyVal; if (!a in someArray) { }" which reads "if false in someArray".
                           // Also (unfortunately) permits using "if (!a instanceof someVar)" which reads "if false instanceof someVar" which makes no sense.
  'valid-typeof': 1, // Warn but allow using "typeof someVar === 'non-common-so-possibly-typo-object-name'" even if it doesn't work. Inform but build.

  // (2) STOP BUILD AND ERROR IN THESE CASES
  'getter-return': 2, // Stop, no empty getters
  'no-compare-neg-zero': 2, // Stop, no "x === -0" comparisons
  'no-cond-assign': 2, // Stop, no "if (x = 0)", may deny some oneliners but these are bad coding practise anyway
  'no-debugger': 2, // No reason to use "debugger;" unless specified for the project
  'no-dupe-args': 2, // Stop, no "function(a,b,a) {}"
  'no-dupe-keys': 2, // Stop, no "obj = {a: 1, a: 2}"
  'no-duplicate-case': 2, // Stop, no "case 1: break; case 2: break; case 1: break;"
  'no-empty-character-class': 2, // Stop, prevent regex errors in cases triggering this like /^abc[]/
  'no-ex-assign': 2, // Stop, no "catch (e) { e = 'asd'; }" please. Let error tell where it originated from.
  'no-inner-declarations': 2, // Stop; parsers permit this, standard does not. No function myNamespace() { function doSomething() {}; }. Use fn expressions.
  'no-obj-calls': 2, // Stop, no calling Math(), JSON(), or Reflect() as-if functions. Use their methods instead.
  'use-isnan': 2, // Stop, no comparing NaN directly to anything. FORCE the use of function isNan() instead.

  /*
   * (DEFAULT DEFINED) RULES ON BEST PRACTISES
   */
  'no-octal': 0, // ALLOW use of Octal numbers e.g. "var myNum = 070;" -> 57 in decimal
  'no-case-declarations': 1, // Warn, RECOMMEND using blocks in case/default statements when initialising new variables in it
                             // SPECIFICATION: https://eslint.org/docs/rules/no-case-declarations
  'no-empty-pattern': 1, // Warn, when using no-op destructuring like "var {a: {}} = someVar;" or "var {} = someVar;"
  'no-global-assign': 1, // Warn, when re-assigning something in place of existing global variable (e.g. window, Object, and $ if specified in ESLint globals -option)
  'no-unused-labels': 1, // Warn, when having un-used case labels in code
                         // SPECIFICATION: https://eslint.org/docs/rules/no-unused-labels
  'no-useless-escape': 1, // Warn, when having uselessly escaped characters e.g. "a string with \' character" -> more correctly "a string with ' character"
  'no-redeclare': 2, // Stop, no re-declaring stuff with keyword "var", e.g. "var a = 1; var a = 2;". Use "var a = 1; a = 2;" instead
  'no-self-assign': 2, // Stop, no self-assign such as "a = a;" or "[a,b] = [a,c];".
  'no-fallthrough': 2, // Stop, no switch-case fallthrough with operation without specific "fallthrough" comment
                       // SPECIFICATION: https://eslint.org/docs/rules/no-fallthrough

  /*
   * (DEFAULT DEFINED) RULES ON VARIABLES
   */
  'no-undef': 0, // ALLOW use of undefined and therefore presumably global variables. Bad practise, but we need it for this project involving implicit jQuery global.
                 // WE COULD use this rule with a separately specified /* global <whatever-defined-in-global> */ comment but for sake of simplicity just allow this.
  'no-unused-vars': 1, // Warn, when having unused variables or functions. Allow it anyway since these rules apply to BOTH development and "production".
  'no-delete-var': 2, // Stop, no using delete -keyword on variables. It is reserved for properties of an object, like "let obj = {a:1, b:2}; delete obj.b;"

  /*
   * (DEFAULT DEFINED) RULES ON CODING STYLES AND -PRACTISES
   */
  'no-mixed-spaces-and-tabs': 2, // Stop, no single lines of code containing BOTH whitespace and tab characters

  /*
   * (DEFAULT DEFINED) RULES ON ECMASCRIPT2015/ES6 SPECIFIC THINGIES
   */
  'constructor-super': 2, // Stop; Use super() when using "extends", do not use it when not extending. Force these cases.
  'no-class-assign': 1, // Warn, when assigning something else into a class e.g. "class A { }; A = 0;"
  'no-const-assign': 2, // Stop, no overriding const variables even if ES6/ES2015 may permit doing it.
  'no-dupe-class-members': 2, // Stop, no duplicate class members (properties or methods)
  'no-new-symbol': 2, // Stop, Symbol() is not meant to be called with new (and likely throws a type error).
  'no-this-before-super': 2, // Stop, no using this -keyword in constructor before super() -call. Superclass -> subclass.
  'require-yield': 2 // Stop, *generator functions should "yield" result(s) at some point, or they should not be generators.
};

gulp.task('html', function () {
  return gulp.src('sources/index.html')
    .pipe(gulp.dest('distribution'))
    .on('end', browsersync.reload);
});

gulp.task('sass-css', function(){
  return gulp.src('sources/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'})) // Minify aswell
    .pipe(autoprefixer({
      add: true,
      remove: true,
      cascade: false, // SASS is already minified so do not cascade
      browsers: ['last 2 versions', '> 1%', 'Firefox ESR'] // http://browserl.ist/?q=last+2+versions%2C+%3E+1%25%2C+Firefox+ESR
    }))
    .pipe(concatenate('bundle.min.css')) // Bundle css
    .pipe(gulp.dest('distribution'))
    .pipe(browsersync.reload({stream: true}));
});

gulp.task('javascript', function() {
  return gulp.src('sources/js/**/*.js')
    .pipe(eslint({
      envs: ['browser', 'es6'],
      globals: ['jQuery', '$'],
      rules: ESLINT_RULES
    })).pipe(eslint.format()).pipe(eslint.failAfterError())
    .pipe(babel({presets: ['es2015']}))
    .pipe(concatenate('bundle.min.js')) // Bundle javascript
    .pipe(uglify().on('error', (err) => {gutil.log(err); throw new Error('Error when minifying - doublecheck mangled references');}))
    .pipe(gulp.dest('distribution'))
    .on('end', browsersync.reload);
});

gulp.task('browsersync', function() {
  browsersync.init({
    server: { baseDir: 'distribution' }
  })
});

gulp.task('watch', ['browsersync', 'html', 'sass-css', 'javascript'], function() {
  gulp.watch('sources/scss/**/*.scss', ['sass-css']);
  gulp.watch('sources/js/**/*.js', ['javascript']);
  gulp.watch('sources/index.html', ['html']);
});

gulp.task('just-build', ['html', 'sass-css', 'javascript']);