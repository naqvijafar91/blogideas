/**
 * Created by jafarnaqvi on 25/05/16.
 */

module.exports = function(req, res, next) {
  if (req.secure) {
    // Already https; don't do anything special.
    next();
  } else {
    // Redirect to https.
    res.redirect('https://' + req.headers.host + req.url);
  }
};
