$(function()
{
	$("#home").hide();
	$("#swap").on("click", function(e)
	{
		$("#home").toggle();
		$("#container").toggleClass("flipped");
	});
	$("iframe").on("load", function()
	{
		$contents = $("iframe").contents();
		$contents.find("#google").on("click", function()
		{
			$("#frame").attr("src", "http://www.google.fi/custom?q=" + $contents.find("#googlequery").val());
		});
		$contents.find("#wikipedia").click(function()
		{
			$("#frame").attr("src", "http://fi.wikipedia.org/w/index.php?search=" + escape($contents.find("#wikipediaquery").val()));
		});
	});
	$("#home").on("click", function()
	{
		$("#frame").attr("src", "search.html");
	});
	$(window).on("resize", function()
	{
		$(".camera").css({top: $(window).height()-$(".camera").outerHeight()>>1 + "px"});
	});
	$(".camera").css({top: $(window).height()-$(".camera").outerHeight()>>1 + "px"});
});
