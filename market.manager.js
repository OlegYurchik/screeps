const marketManager = {
    loop() {
        if (!Memory.market) {
            Memory.market = {
                sell: {},
                buy: {},
            };
        }

        // Selling
        for (let resource in Memory.market.sell) {
            this.sell(
                resource,
                Memory.market.sell[resource].minPrice,
                Memory.market.sell[resource].minAmount,
                Memory.market.sell[resource].maxAmount,
            )
        }

        // Generate pixel
        if (Game.cpu.bucket >= PIXEL_CPU_COST) {
            Game.cpu.generatePixel();
        }
    },

    setSell(resource, minPrice, minAmount, maxAmount) {
        Memory.market.sell[resource] = {
            minPrice: minPrice,
            minAmount: minAmount,
            maxAmount: maxAmount,
        };
        return true;
    },

    setBuy(resource, minPrice, maxPrice, maxAmount) {
        Memory.market.sell[resource] = {
            minPrice: minPrice,
            maxPrice: maxPrice,
            maxAmount: maxAmount,
        };
        return true;
    },

    sell(resource, minPrice, minAmount, maxAmount) {
        var buyOrders = Game.market.getAllOrders(function(order) {
            return order.type == ORDER_BUY && order.resourceType == resource &&
                (!minPrice || order.price >= minPrice);
        });
        var bestBuyOrder;
        if (buyOrders.length > 0) {
            bestBuyOrder = buyOrders[0];
            for (let order of buyOrders) {
                if (order.price > bestBuyOrder.price) {
                    bestBuyOrder = order;
                }
            }
            let amount = Math.min(bestBuyOrder.amount, Game.resources[resource]);
            if (minAmount != null && amount < minAmount) {
                return;
            }
            if (maxAmount != null && maxAmount < amount) {
                amount = maxAmount;
            }
            let result = Game.market.deal(bestBuyOrder.id, amount);
            if (result == OK) {
                if (amount == Memory.market.sell[resource].maxAmount) {
                    delete Memory.market.sell[resource];
                } else {
                    if (minAmount != null) {
                        Memory.market.sell[resource].minAmount -= amount;
                    }
                    if (maxAmount != null) {
                        Memory.market.sell[resource].maxAmount -= amount;
                    }
                }
            }
            return result;
        }
    },
};

module.exports = marketManager;
