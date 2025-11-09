module.exports = function filterCurrency(req, res, next) {
  req.filterPricesByCountry = function (docOrDocs) {
    const country = req.clientCountry || 'NG';

    // Helper to process a single doc
    const processDoc = (doc) => {
      if (!doc) return doc;

      // Convert Mongoose doc to plain JS object if needed
      doc = doc.toObject ? doc.toObject() : doc;

      if (doc.pricingPackage?.pricingPlans?.length) {
        doc.pricingPackage.pricingPlans = doc.pricingPackage.pricingPlans.map(
          (plan) => {
            if (plan.price) {
              if (country === 'NG') {
                delete plan.price.usd;
              } else {
                delete plan.price.ngn;
              }
            }
            return plan;
          }
        );
      }

      return doc;
    };

    // If array, process each; otherwise process single doc
    if (Array.isArray(docOrDocs)) {
      return docOrDocs.map(processDoc);
    } else {
      return processDoc(docOrDocs);
    }
  };

  next();
};
