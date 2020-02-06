const { Router } = require('express')
const SearchSetting = require('../../models/search_setting')

const router = Router()

router.get('/', async (req, res, next) => {
  const { id: userId } = req.user
  try {
    const search_settings = await SearchSetting.findOne({
      where: {
        userId,
      },
    })

    res.status(200).json(search_settings)
  } catch (error) {
    next(error)
  }
})

router.post('/edit', async (req, res, next) => {
  const { id: userId } = req.user
  const { has_pic, min_price, max_price, posted_today } = req.body

  try {
    const result = await SearchSetting.update(
      {
        has_pic,
        min_price,
        max_price,
        posted_today,
      },
      { where: { userId } },
    )

    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
