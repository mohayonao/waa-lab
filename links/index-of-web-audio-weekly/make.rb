require 'open-uri'
require 'nokogiri'

def read_local_issues
  header = /^##### \[(.+)\]\((.+)\) : (.+)$/
  issues = []
  issue = nil

  text = open("#{ __dir__ }/README.md").read rescue ''

  text.each_line do |line|
    case
    when header =~ line
      issues << issue unless issue.nil?
      issue = { title:$1, url:$2, date:$3, topics:[] }
    when (issue and line.start_with?('-'))
      issue[:topics] << line.chomp
    end
  end

  issues << issue unless issue.nil?

  issues
end

def fetch_published_issues
  base_url = 'http://blog.chrislowis.co.uk/'

  html = open(base_url + 'waw.html').read
  doc = Nokogiri::HTML.parse(html, nil, 'utf-8')

  doc.css('.listing > li').map {|li|
    title = li.css('a')[0].text
    url = base_url + li.css('a')[0][:href]
    date = Date.parse(li.css('span')[0].text).strftime('%Y-%m-%d')
    { title:title, url:url, date:date, topics:[] }
  }
end

def merge_issues(a, b)
  a = Hash[a.map {|issue| [ issue[:url], issue ] }]
  b = Hash[b.map {|issue| [ issue[:url], issue ] }]

  b.merge(a).values.sort_by {|issue| issue[:date] }.reverse
end

def fetch_topics(url)
  html = open(url).read
  doc = Nokogiri::HTML.parse(html, nil, 'utf-8')

  doc.css('h2').map {|h2| '- ' + escape_markdown(h2.text) }
end

def escape_markdown(text)
  text = text.gsub('*', '\*')
  text
end

def main(header)
  issues = merge_issues(read_local_issues, fetch_published_issues)

  issues.select {|issue| issue[:topics].empty? }.each_with_index do |issue, index|
    sleep(2) unless index.zero?
    puts "fetch: #{ issue[:url] }"
    issue[:topics] = fetch_topics(issue[:url])
  end

  num_of_posts = issues.length
  num_of_topics = issues.reduce(0) {|sum, issue| sum + issue[:topics].length }

  open("#{ __dir__ }/README.md", "w") do |f|
    f.puts header
    f.puts
    f.puts ":trophy: _#{ num_of_posts } posts and #{ num_of_topics } topics are... awesome!!_"
    f.puts
    f.puts '---'
    issues.each do |issue|
      title, url, date, topics = issue.values_at(:title, :url, :date, :topics)
      f.puts
      f.puts "##### [#{ title }](#{ url }) : #{ date }"
      f.puts topics.join("\n")
    end
  end

  puts 'done!!'
end

main <<-EOS
# Index of Web Audio Weekly

Web Audio Weekly is a valuable source of the latest topics about the Web Audio API, the Web MIDI API or sound on the web that written by Chris Lowis.

http://blog.chrislowis.co.uk/waw.html
EOS
