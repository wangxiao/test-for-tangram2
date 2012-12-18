/**
 * @author zhanghongyan
 */
///import baidu.get;
///import baidu.array.some;


/**
 * @description 判断两个元素是否相交
 * @function
 * @name baidu.dom().isCrash()
 * @grammar baidu.dom(args).isCrash(tar)
 * @param {Selector|TangramDom|htmlElement}  args 指定的容器或者选择器
 * @param {Selector|TangramDom}  tar 传入被相交的容器或者选择器
 * @return {Boolean} 是否相交
 */
baidu.dom.extend( {
	isCrash:function ( tar ) {

		//如果选择器或者传入的值是空，直接返回false
		if ( !this.length || !tar ) {
			return false;
		}

		var me = this,
			arr = [].slice.call(this);    //或者 arr = baidu.makeArray(me);

		return baidu.array(arr).some(function(item, index) {

			var selector = item, //选择器
				target = baidu.dom( tar ).get( 0 ), //传入的元素

				//getBoundingClientRect 方法非 IE 下返回一个矩形对象，包含6个属性，left、top、right、bottom、width、height，IE 下返回四个属性 left、top、right、bottom
				getBoundSelector = selector.getBoundingClientRect(),
				getBoundTarget = target.getBoundingClientRect(),

			    //通过 getBoundingClientRect 方法得出的 选择器的 left、right、top、bottom四个值
				selectorLeft = getBoundSelector.left,
				selectorRight = getBoundSelector.right,
				selectorTop = getBoundSelector.top,
				selectorBottom = getBoundSelector.bottom,

				//通过 getBoundingClientRect 方法得出的 传入元素的 left、right、top、bottom四个值
				targetLeft = getBoundTarget.left,
				targetRight = getBoundTarget.right,
				targetTop = getBoundTarget.top,
				targetBottom = getBoundTarget.bottom,

				term =  ((selectorLeft >= targetLeft && selectorLeft <= targetRight || selectorLeft <= targetLeft && selectorRight >= targetLeft) && selectorTop <= targetBottom && selectorBottom >= targetTop) ||
						//选择器在中间，目标元素在周围

						((targetLeft >= selectorLeft && targetLeft <= selectorRight || targetLeft <= selectorLeft && targetRight >= selectorLeft) && targetTop <= selectorBottom && targetBottom >= selectorTop) ||
						//目标元素在中间，选择器在周围

						(selectorLeft >= targetLeft && selectorTop >= targetTop && selectorRight <= targetRight && selectorBottom <= targetBottom) ||
						//选择器包围目标元素

						(targetLeft >= selectorLeft && targetTop >= selectorTop && targetRight <= selectorRight && targetBottom <= selectorBottom);
						//目标元素包围选择器

			return  term;

		});

	}

} );