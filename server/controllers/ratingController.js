const { Rating, Product, User } = require('../models/models')

class RatingController {
    async create(req, res) {
        const { rate, userId, productId } = req.body;

        if (!rate || !userId || !productId) {
            return res.status(400).json({ message: 'Все поля должны быть заполнены' });
        }

        const existingRating = await Rating.findOne({ where: { userId, productId } })
        if (existingRating) {
            return res.status(400).json({ message: 'You have already left a rating for this product' });
        }
        const user = await User.findOne({ where: { id: userId } })
        const rating = await Rating.create({ rate, userId, productId })
        const productRatings = await Rating.findAll({ where: { productId } })
        const averageRating = productRatings.reduce((sum, rating) => sum + rating.rate, 0) / productRatings.length;

        await Product.update(
            { rating: averageRating.toFixed(1) },
            { where: { id: productId } }
        )

        return res.json({
            rating,
            username: user.username
        }
        )
    }
}

module.exports = new RatingController();